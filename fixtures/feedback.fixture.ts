import { Selector } from 'testcafe';
import { LoginPageObject } from '../helpers/login.po';
import { FeedbackPageObject } from '../helpers/feedback.po';

const feedbackPo = new FeedbackPageObject();
const loginPo = new LoginPageObject();

fixture('Feedback form')
  .page('http://localhost:4200')
  .beforeEach(async (t: TestController) => {
    await loginPo.loginWithRedirect(t, 'feedback');
  })
  .afterEach(async (t: TestController) => await loginPo.logout(t));

test('should submit form', async (t: TestController) => {
  await feedbackPo.fillForm(t, 'john.doe@company.com', 'Average', 'Needs work');

  await feedbackPo.clickSendFeedbackBtn(t);

  await t.expect(feedbackPo.success).ok();
});

test('should display error when email not valid', async (t: TestController) => {
  await feedbackPo.fillForm(t, 'john.doe', 'Average', 'Needs work');

  await feedbackPo.clickSendFeedbackBtn(t);

  await t.expect(feedbackPo.success).notOk();
  await t.expect(feedbackPo.emailInvalid).ok();
});

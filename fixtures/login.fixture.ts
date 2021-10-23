import { Selector } from 'testcafe';
import { LoginPageObject } from '../helpers/login.po';

const loginPo = new LoginPageObject();
const page = 'http://localhost:4200';

fixture('LoginFixture Screen Validation').page(page);

test('Should display info alert box', async (t: TestController) => {
  const alertVisible = await Selector('div .alert.alert-info').exists;

  await t.expect(alertVisible).ok();
});

test('Should contain correct texts for login form', async (t: TestController) => {
  const userInputPlaceholder = await Selector('#username').getAttribute(
    'placeholder',
  );

  const passwordInputPlaceholder = await Selector('#password').getAttribute(
    'placeholder',
  );

  const loginButtonText = await Selector('button').withAttribute(
    'type',
    'submit',
  ).innerText;

  await t.expect(userInputPlaceholder).contains('username');
  await t.expect(passwordInputPlaceholder).contains('password');
  await t.expect(loginButtonText.trim()).eql('Log in');
});

test('should log out', async (t: TestController) => {
  await loginPo.logout(t);
  const loginPage = Selector('.e2e-login-page').exists;
  await t.expect(loginPage).ok();
}).before(async (t: TestController) => await loginPo.loginWithRedirect(t));

fixture('LoginFixture')
  .page(page)
  .beforeEach(async (t: TestController) => await loginPo.loginWithRedirect(t))
  .afterEach(async (t: TestController) => await loginPo.logout(t));

test('Should log in', async (t: TestController) => {
  const notesPage = Selector('.e2e-notes-page').exists;
  await t.expect(notesPage).ok();
});

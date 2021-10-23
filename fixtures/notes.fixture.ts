import { Selector } from 'testcafe';
import { LoginPageObject } from '../helpers/login.po';
import { NotesPageObject } from '../helpers/notes.po';

const loginPo = new LoginPageObject();
const notesPo = new NotesPageObject();

fixture('Notes Page')
  .page('http://localhost:4200/notes')
  .beforeEach(async (t: TestController) => await loginPo.loginWithRedirect(t))
  .afterEach(async (t: TestController) => await loginPo.logout(t));

test('should filter notes', async (t: TestController) => {
  await notesPo.search(t, 'Dentist');
  await t.expect(notesPo.notesCount).eql(1);
});

test('should delete note', async (t: TestController) => {
  await notesPo.deleteNote(t, 2);
  await t.expect(notesPo.notesCount).eql(4);
});

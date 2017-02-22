export default function* () {
  let placeholderID = 'a';
  while (true) { // eslint-disable-line no-constant-condition
    yield placeholderID;
    placeholderID = ((parseInt(placeholderID, 36) + 1).toString(36)).replace(/0/g, 'a');
  }
}

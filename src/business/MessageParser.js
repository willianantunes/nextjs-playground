const extractMentions = message => {
  const mentionRegex = /@(\w+)/g;
  const mentions = [];
  let matchedContent;

  while ((matchedContent = mentionRegex.exec(message))) {
    mentions.push(matchedContent[1]);
  }

  return mentions;
};

export function evaluate(message) {
  const mentions = extractMentions(message);
  const emoticons = undefined;
  const links = undefined;

  return {
    mentions,
    emoticons,
    links,
  };
}

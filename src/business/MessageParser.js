const extractMentions = message => {
  const mentionRegex = /@(\w+)/g;
  const mentions = [];
  let matchedContent;

  while ((matchedContent = mentionRegex.exec(message))) {
    mentions.push(matchedContent[1]);
  }

  return mentions;
};

const extractEmoticons = message => {
  const emoticonsRegex = /\(([ -~]{0,15})\)/g;
  const emoticons = [];
  let matchedContent;

  while ((matchedContent = emoticonsRegex.exec(message))) {
    emoticons.push(matchedContent[1]);
  }

  return emoticons;
};

export function evaluate(message) {
  const mentions = extractMentions(message);
  const emoticons = extractEmoticons(message);
  const links = undefined;

  return {
    mentions,
    emoticons,
    links,
  };
}

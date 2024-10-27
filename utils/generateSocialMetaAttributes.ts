type SocialAttributes = {
    src: string;
    width: number;
    height: number;
    url: string;
    title?: string;
    description?: string;
  };
  
export const livelyTitle = 'Lively - Real Estate Platform';

export const livelyDescription =
  'Lively can help you rent, sell, or buy accomodation, take a mortage, invest in real estate, and a lot more';

export function generateSocialMetaAttributes({ src, url, width, height, title, description }: SocialAttributes): Array<{
  content: number | string;
  name: string;
}> {
  const ogTitle = title
    ? {
        content: title,
        name: 'og:title',
      }
    : undefined;

  const twitterTitle = title
    ? {
        content: title,
        name: 'twitter:title',
      }
    : undefined;

  const twitterDescription = description
    ? {
        content: description,
        name: 'twitter:title',
      }
    : undefined;

  return [
    {
      content: livelyDescription,
      name: 'og:description',
    },
    {
      content: livelyTitle,
      name: 'og:site_name',
    },
    {
      content: url,
      name: 'og:url',
    },
    {
      content: src,
      name: 'og:image',
    },
    {
      content: width,
      name: 'og:image:width',
    },
    {
      content: height,
      name: 'og:image:height”',
    },
    {
      content: src,
      name: 'twitter:image',
    },
    ogTitle,
    twitterTitle,
    twitterDescription,
  ].filter((value) => value !== undefined);
}
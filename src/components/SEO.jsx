import useSiteMetadata from '@hooks/useSiteMetadata';

export default function SEO({ title, description, pathname, children }){
  var {
    title: defaultTitle,
    description: defaultDescription,
    siteUrl,
  } = useSiteMetadata();
  var seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ''}`,
  };

  // Support deriving titles from the default.
  if (typeof(title) == 'function') {
    seo.title = title(defaultTitle);
  }

  return (
    <>
      <title >{seo.title}</title>
      <meta name='title' property='og:title' content={seo.title}/>
      <meta name='type' property='og:type' content='website'/>
      <meta name='url' property='og:url' content={seo.url}/>
      <meta name='description' property='og:description' content={seo.description} />
      {children}
    </>
  );
}

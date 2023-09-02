export const formatDate = (date: string): string => {
  const formatedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return formatedDate
}

export const formatImageUrl = (image: string): string => `/images/posts/${image}`

export const slugify = (title: string): string =>
  title
    .toLowerCase()
    .replaceAll(' ', '-')
    .trim()
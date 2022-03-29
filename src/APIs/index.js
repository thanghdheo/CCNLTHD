import sanityClient from '@sanity/client'
export const client = sanityClient({
  projectId: 'yojmvs0q',
  dataset: 'production',
  apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
  token: "skkcnEciY2i10L2QkAvvY6RPLsaxDgeospHBHF3MvZ4gsWuOVQJV8cOaVNsjLtxt3uEME8hFnPG6M4jmrITQiRUnVUlDZ3FOsvnf3JukCJIGbVkCgDpBE4ZVM0iIQijMZZog02aYPK54Co4aIjtrIibCLFOljIoGWcS2fluevA6C6nk0NgDw",
  useCdn: true, // `false` if you want to ensure fresh data
})
import sanityClient from '@sanity/client'
export const client = sanityClient({
  projectId: 'yojmvs0q',
  dataset: 'production',
  apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
  token: 'skQajh5sVkxmaGp8Z8lxjeb2cdCRd66RPWCcam2eeMUz3MCke33Xwg16nkXbaHnXWak73uRpVFlP0KFy2vFm25NSNPLlaZGoLFFwJxfMk5mtvYZTJfeupVYzMDCngLtwI4ogpfXb0jhAbrdPYOOoDcDi1xFskkPlABXeliwWcfsHIJsCAMw3', // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})
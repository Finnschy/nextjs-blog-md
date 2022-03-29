export const sortByDate = (a, b) => {
    // absteigend, also das höchste zu erst. wenn aufsteigend muss a zuerst
return new Date(b.frontmatter.date) - new Date(a.frontmatter.date )
}
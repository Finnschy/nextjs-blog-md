import fs from "fs"
import path from "path"
import Head from 'next/head'
import matter from "gray-matter";
import {sortByDate} from "../utils"

import SinglePost from "../components/SinglePost";

export default function Home({posts}) {
  return (
    <div>
      <Head>
        <title>Dev Blog</title>
      </Head>
      <div className="posts">
        {posts.map((post, index) => (
          <SinglePost key={index} post={post}/>
        ))}
      </div>
    </div>
  )
}

// die funktion läuft serverseitig, daher kann man fs und path module nutzen, die ja eigentlich von node kommen
export async function getStaticProps() {
  // hiermit schaut es direkt in den ordner "posts" in dem wir die posts speichern
  const files = fs.readdirSync(path.join('posts'))
  
  // get slug and frontmatter from post
  const posts = files.map(filename => {

    // slug erstellen
    const slug = filename.replace(".md", "")

    // frontmatter (metadata in markdown) erstellen
    const markdownWithMeta = fs.readFileSync(path.join("posts", filename), "utf-8")

    const {data: frontmatter} = matter(markdownWithMeta)

    return {
      slug,
      frontmatter
    }
  })

  return { 
    props: {
      posts: posts.sort(sortByDate)
    }
  }
}
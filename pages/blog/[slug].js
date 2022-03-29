import fs from "fs"
import path from "path"
import matter from "gray-matter";
import { marked } from "marked";
import Link from "next/link";

export default function PostPage({ frontmatter: { title, date, cover_image }, slug, content }) {
    return (
        <>
            <Link href="/">
            <a href="" className="btn btn-back">Go Back</a>
            </Link>
            <div className="card card-page">
                <h1 className="post-title">
                    {title}
                </h1>
                <div className="post-date">Posted on {date}</div>
                <img src={cover_image} alt="" />
                <div className="post-body">
                    <div dangerouslySetInnerHTML={{ __html: marked(content)}}></div>
                </div>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join("posts"))

    const paths = files.map((filename) => ({
        // wir generieren den slug aus dem dateinamen und weisen ihn den params zu
        // in der function unten getStaticProps übergeben wir als argument die params mit dem slug
        params: {
            slug: filename.replace(".md", ""),
        },
    }))

    console.log(paths);
    return {
        paths,
        fallback: false
    }
}

// hier machen wir object destruction und geben den wert aus slug bzw params weiter, wenn wir also auf der seite auf read more klicken wird der console log mit dem passenden slug gefüllt sein
export async function getStaticProps({ params: { slug } }) {
    const markdownWithMeta = fs.readFileSync(path.join("posts", slug + ".md"), "utf-8")

    const { data: frontmatter, content } = matter(markdownWithMeta)

    return {
        props: {
            frontmatter,
            slug,
            content
        }
    }
}
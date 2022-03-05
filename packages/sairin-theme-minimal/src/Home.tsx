import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";
import { Footer } from "./Footer";

import { HomePageThemeProps } from "@sairinjs/core";
import PostTags from "./PostTags";

export default function Home(props: HomePageThemeProps) {
  return (
    <>
      <Head>
        <title>{props.themeConfig.title}</title>
      </Head>
      <div className="container mx-auto max-w-2xl mt-24 px-4 sm:px-0">
        <div className="text-3xl font-bold mb-4">{props.themeConfig.title}</div>

        <div className="mt-2 mb-8">
          <div className="flex gap-2">
            {props.themeConfig.links?.map((link, index) => {
              return (
                <>
                  <a
                    className="underline"
                    target="_blank"
                    href={link.url}
                    key={link.url}
                  >
                    {link.title}
                  </a>
                  {index !== props.themeConfig.links.length - 1 && "•"}
                </>
              );
            })}
          </div>
        </div>

        <div>
          {props.posts.map((post) => {
            return (
              <div key={post.id} className="text-xl my-8">
                <Link href={`/${post.attributes.path || post.number}`}>
                  <a className="hover:underline">{post.title}</a>
                </Link>

                {post.labels.length > 0 && <PostTags labels={post.labels} />}
                <div className="text-sm">
                  {dayjs(post.createdAt).format("DD/MM/YYYY")}
                </div>
              </div>
            );
          })}
        </div>

        <div className="my-12">
          <Footer />
        </div>
      </div>
    </>
  );
}

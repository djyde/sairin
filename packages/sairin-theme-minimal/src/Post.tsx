export default function Post (props) {
  return (
    <div>

      <div className="container mx-auto mt-24 max-w-2xl">
        <div className="text-3xl font-medium">
          {props.post.title}
        </div>
        <div dangerouslySetInnerHTML={{ __html: props.post.html }}>

        </div>

      </div>

    </div>
  )
}
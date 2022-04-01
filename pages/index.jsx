import useSwr from 'swr'
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
  // const data = getTemp()
  // let {data, err} = useSwr('/api/getAq', fetcher)
  let {data, err} = useSwr('/api/getTemp', fetcher)
  if (err) return <div>Failed to load users</div>
  if (!data) return <div>Loading...</div>
  let {location} = data
  console.log(data);
  return (
    <div>
      <div className='text-center'>
        <h1 className=" text-cyan-500 text-5xl">
        location
        </h1>
        <h1 className="text-7xl">
        {location}
        </h1>
      </div>
    </div>
  )
}

"use client"
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
export function Control() {
  const params = useParams();
  const router=useRouter();
  //console.log("파람스: ",params)
  const id = params.id
  return (
    <ul>
      <li><Link href="/create">Create</Link></li>
      {id ? 
      <>      <li><Link href={`/update/${id}`}>Update</Link></li>
              <li><input type="button" value="Delete"
              onClick={()=>{

                const options = {
                  method:'DELETE',
                  
              }

              fetch(process.env.NEXT_PUBLIC_API_URL+`topics/${id}`,options)
              .then(res=>res.json())
              .then(result=>{
                  
                  router.refresh()
                  router.push(`/`)
              })



              }}
              
              
              ></input></li>
      </>

      : <></>}
    </ul>
  );
}

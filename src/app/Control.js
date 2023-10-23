"use client"
import Link from 'next/link';
import { useParams } from 'next/navigation';
export function Control() {
  const params = useParams();

  //console.log("파람스: ",params)
  const id = params.id
  return (
    <ul>
      <li><Link href="/create">Create</Link></li>
      {id ? 
      <>      <li><Link href={`/update/${id}`}>Update</Link></li>
      <li><input type="button" value="Delete"></input></li>
      </>

      : <></>}
    </ul>
  );
}
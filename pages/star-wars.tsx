import { useState, useEffect } from "react"
import useSWR from 'swr'

// schema
import { Character, Props } from '../schema/page.schema'

const StarWarsPage = ({ character }: Props) => {
  // state
  // const [characters, setCharacters] = useState<Array<Record<string, any>>>([])
  // const [isLoading, setIsLoading] = useState<boolean>(false)

  // // effect
  // useEffect(() => {
  //   setIsLoading(true)

  //   const fecthData = async () => {
  //     try {
  //       const data = await fetch('https://swapi.dev/api/people/')
  //       const jsonData = await data.json()

  //       if (!jsonData || !jsonData.results) {
  //         throw new Error()
  //       }

  //       setCharacters(jsonData.results)
  //     } catch (error) {
  //       return (<div><h1>Data not found</h1></div>)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   fecthData()
  // }, [])

  // if (isLoading) {
  //   return (<div><h1>Loading...</h1></div>)
  // }

  const { data, error, isLoading } = useSWR('https://swapi.dev/api/people/', (url: string) => fetch(url).then(res => res.json()))

  if (error) {
    return (<div><h1>Data not found</h1></div>)
  }

  if (isLoading) {
    return (<div><h1>Loading...</h1></div>)
  }

  const { results: characters } = data

  return (
    <>
      {!!characters?.length && characters.map((character: Character) => (
        <div key={character.name.trim()}>
          <p><b>Name:</b> {character.name}</p>
          <p><b>Birth:</b> {character.birth_year}</p>
          <hr />
          <br />
        </div>
      ))}
    </>
  )
}

export const getStaticProps = async () => {
  try {
    const data = await fetch('https://swapi.dev/api/people/')
    const jsonData = await data.json()

    return {
      props: {
        characters: jsonData.results,
      },
    }
  } catch (error) {
    return { notFound: true, }
  }
}

export default StarWarsPage
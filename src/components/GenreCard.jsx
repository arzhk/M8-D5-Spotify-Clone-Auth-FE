import React from "react";

function GenreCard({ data }) {
  /*   const [data, setData] = useState({});
   */
  /*   const fetchHandler_genre = async (genreID) => {
    try {
      const response = await fetch(
        `https://yabba-dabba-duls-cors-anywhere.herokuapp.com/https://api.deezer.com/genre/${genreID}`
      );
      const data = await response.json();
      console.log(data);
      if (!data.error) {
        setData(data);
        props.setGenres([...props.genres, data]);
      }
    } catch (error) {
      console.log(error);
    }
  }; */

  const getRandomColour = () => {
    let randomColourR = Math.floor(Math.random() * 166) + 89;
    let randomColourG = Math.floor(Math.random() * 166) + 89;
    let randomColourB = Math.floor(Math.random() * 166) + 89;
    const randomColour = `rgba(${randomColourR},${randomColourG},${randomColourB})`;
    return randomColour;
  };

  /*   const start = async () => {
    await fetchHandler_genre(props.id);
  };

  useEffect(() => {
    start();
  }, []);
 */
  return (
    <div className="browse-card" style={{ backgroundColor: getRandomColour() }}>
      <h4 className="text-left">{data.text}</h4>
    </div>
  );
}

export default GenreCard;

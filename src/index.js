import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       <StartRating color="blue" maxRating={10} onSetRating={setMovieRating} />
//       <p>this movie was rated {movieRating} stars</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <StartRating
      maxRating={5}
      messages={["terr", "bad", "good", "okay", "amazing"]}
      onSetRating={(r) => console.log("Second rating:", r)}
    />
    <StartRating
      size={24}
      color="red"
      className="test"
      defaultRating={3}
      onSetRating={(r) => console.log("Second rating:", r)}
    />
    <Test /> */}
    <App />
  </React.StrictMode>
);

import { useEffect, useState } from "react";

import "./AvailableMeals.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";


function AvailableMeals() {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

   useEffect(() => {
      const fatchMeals = async () => {
         
        const response = await fetch("https://food-order-app-27d46-default-rtdb.firebaseio.com/meals.json");
         if(!response.ok) {
           throw new Error("Something went wrong!")
         }

        const responseData = await response.json();

        const loadedMeals = [];

        for(const key in responseData) {
          loadedMeals.push({
              id: key,
              name: responseData[key].name,
              description: responseData[key].description,
              price: responseData[key].price,
          })
        }
         setMeals(loadedMeals); 
         setIsLoading(false);
       } 

         
            fatchMeals().catch( error => {
              setIsLoading(false);
              setHttpError(error.message);
            })
   }, [])

      if(isLoading) {
        return (
          <section className="MealsLoading">
             <p>Loading...</p>
          </section>
        )
      }

      if(httpError) {
        return (
          <section className="MealsError">
             <p>{httpError}</p>
          </section>
        )
      }

    const mealsList = 
    meals.map(meal => 
           <MealItem 
               key={meal.id}
               id={meal.id} 
               name={meal.name}
               description={meal.description}
               price={meal.price} 
               />
            );

    return (      
        <section className="meals">
          <ul>
            <Card>
              {mealsList}   
            </Card> 
          </ul>
        </section>      
    )
};

export default AvailableMeals;
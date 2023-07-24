import React, { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import Cards from "../../../Components/Cards/Cards";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

function UserDashboardDefaultScreen() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get("http://localhost:3005/cars");
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleAddCar = async () => {
    const newCar = {
      name: "Full name",
      model: "Model year",
      color: "New Color",
      image: "new_car_image.jpg/png",
    };

    try {
      const response = await axios.post("http://localhost:3005/cars", newCar);
      setCars([...cars, response.data]);
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  const handleUpdateCar = async (carId, updatedCar) => {
    try {
      const response = await axios.put(
        `http://localhost:3005/cars/${carId}`,
        updatedCar
      );
      const updatedCars = cars.map((car) =>
        car._id === carId ? response.data : car
      );
      setCars(updatedCars);
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      await axios.delete(`http://localhost:3005/cars/${carId}`);
      const updatedCars = cars.filter((car) => car._id !== carId);
      setCars(updatedCars);
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Welcome!</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item active">Dashboard</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="center-outer">
        <div className="center-inner">
          {cars.length > 0 ? (
            <Slider {...carouselSettings}>
              {cars.map((car) => (
                <Grid item key={car._id}>
                  <Cards
                    car={car}
                    onUpdateCar={(updatedCar) =>
                      handleUpdateCar(car._id, updatedCar)
                    }
                    onDeleteCar={() => handleDeleteCar(car._id)}
                  />
                </Grid>
              ))}
            </Slider>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

      <div className="mt-4 text-center">
        <Button variant="contained" onClick={handleAddCar}>
          Add New Car
        </Button>
      </div>
    </div>
  );
}

export default UserDashboardDefaultScreen;

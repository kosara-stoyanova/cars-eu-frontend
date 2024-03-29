import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Offer } from "../../models/offerModel";
import OfferComponent from "./OfferComponent";

const Offers: FC = () => {
  const [offers, setOffers] = useState<Offer[] | null>(null);

  const base_url = process.env.REACT_APP_BASE_URL ?? `http://localhost:8080`;

  // Send the GET request with the headers
  useEffect(() => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${base_url}/offers`, {
        headers,
      })
      .then((response) => {
        setOffers(response.data.data as Offer[]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {offers ? (
        offers.map((offer) => <OfferComponent key={offer._id} offer={offer} />)
      ) : (
        <>No offers found</>
      )}
    </div>
  );
};
export default Offers;

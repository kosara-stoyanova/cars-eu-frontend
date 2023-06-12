import { FC } from "react";
import { Offer } from "../../models/offerModel";

interface Props {
  offer: Offer;
}

const OfferComponent: FC<Props> = (props) => {
  const { offer } = props;

  return (
    <div>
      <div>
        <h4>Title</h4>
        <p>{offer.title}</p>
      </div>
      <div>
        <h4>Description</h4>
        <p>{offer.description}</p>
      </div>
      <div>
        <h4>Price</h4>
        <p>{offer.price}</p>
      </div>
      <div>
        <h4>Seller</h4>
        <p>{offer.author}</p>
      </div>
      <div>
        <h4>Created At</h4>
        <p>{new Date(offer.createdAt).toUTCString()}</p>
      </div>
      <div>
        <h4>Available</h4>
        <p>{offer.closed ? "no" : "yes"}</p>
      </div>
    </div>
  );
};
export default OfferComponent;

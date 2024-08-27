import AreaCard from "./AreaCard";
import "./AreaCards.scss";

const AreaCards = () => {
  return (
    <section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={80}
        cardInfo={{
          title: "Propostas Digitadas-",
          value: "0",
          // text: "We have sold 123 items.",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={50}
        cardInfo={{
          title: "Analise Banco/Pend-",
          value: "0",
          // text: "Available to payout",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={40}
        cardInfo={{
          title: "Propostas Cms/Pagas-",
          value: "0",
          // text: "Available to payout",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={40}
        cardInfo={{
          title: "Propostas Canceladas-",
          value: "0",
          // text: "Available to payout",
        }}
      />
    </section>
  );
};

export default AreaCards;

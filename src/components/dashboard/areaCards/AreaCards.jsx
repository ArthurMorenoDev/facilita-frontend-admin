import AreaCard from "./AreaCard";
import "./AreaCards.scss";

const AreaCards = () => {
  return (
    <section className="content-area-cards">
      <div className="digitada"> 
      <AreaCard 
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={80}
        cardInfo={{
          title: "Propostas Digitadas-",
          value: "0",
          // text: "We have sold 123 items.",
        }}
      />
      </div>

      <div className="pendente">
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={50}
        cardInfo={{
          title: "Analise Banco/Pend-",
          value: "0",
          // text: "Available to payout",
        }}
      />
      </div>

      <div className="paga">
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={40}
        cardInfo={{
          title: "Propostas Cms/Pagas-",
          value: "0",
          // text: "Available to payout",
        }}
      />
      </div>

      <div className="cancelada">
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={40}
        cardInfo={{
          title: "Propostas Canceladas-",
          value: "0",
          // text: "Available to payout",
        }}
      />
      </div>
    </section>
  );
};

export default AreaCards;

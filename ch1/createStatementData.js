import { createPerformaceCalculator } from "./performanceCalculator.js";

const createStatementData = (invoice, plays) => {
  const playFor = (aPerformance) => plays[aPerformance.playID];

  const totalAmount = (performances) =>
    performances.reduce((total, p) => total + p.amount, 0);

  const totalVolumeCredits = (performances) =>
    performances.reduce((total, p) => total + p.volumeCredits, 0);

  const enrichPerformance = (aPerformance) => {
    const calculator = createPerformaceCalculator(
      aPerformance,
      playFor(aPerformance)
    );
    const result = { ...aPerformance };
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    return result;
  };
  const enrichedPerformances = invoice.performances.map(enrichPerformance);

  const statementData = {
    customer: invoice.customer,
    performances: enrichedPerformances,
    totalAmount: totalAmount(enrichedPerformances),
    totalVolumeCredits: totalVolumeCredits(enrichedPerformances),
  };

  return statementData;
};

export default createStatementData;

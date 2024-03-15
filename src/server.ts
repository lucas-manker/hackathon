import Express from "express";
import getAllGuids from "./utils/rest/get_designs";
import {
  getPayItemRelatedGuids,
  getPayItemsForProject,
  getPayItemsForProjectAllFields,
} from "./utils/rest/get_pay_items";
import getAllInspectionsByPin from "./utils/rest/get_inspections";
import getPayItemLookup from "./utils/rest/get_pay_item_lookup";

const app = Express();

app.get("/designCount/:pin", async (req, res) => {
  const designs = await getAllGuids(req.params.pin);
  res.status(200).send({ count: designs.length });
});

app.get("/designSummary/:pin", async (req, res) => {
  const lookup = await getPayItemLookup(req.params.pin);
  const payItems = await getPayItemsForProjectAllFields(req.params.pin);
  let actualPayItems = <any>[];
  Object.keys(payItems).forEach((key) => {
    payItems[key].forEach((item: any) => {
      if (Object.keys(lookup).includes(item.value)) {
        actualPayItems.push([item.item, item.value]);
      }
    });
  });
  res.status(200).send(actualPayItems);
});

app.get("/payItemCount/:pin", async (req, res) => {
  const payItems = await getPayItemsForProject(req.params.pin);
  res.status(200).send({ count: payItems.length });
});

app.get("/missingPayItems/:pin", async (req, res) => {
  const designs = await getAllGuids(req.params.pin);
  const payItems = await getPayItemsForProject(req.params.pin);
  const payItemsSet = new Set(payItems);
  const designSet = new Set(designs);
  res.status(200).send({
    noPayItem: designSet.size - payItemsSet.size,
    payItemPresent: payItemsSet.size,
  });
});

app.get("/inspectionCount/:pin", async (req, res) => {
  const payItems = await getAllInspectionsByPin(req.params.pin);
  res.status(200).send({ count: payItems.length });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

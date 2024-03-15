import axios from "axios";

export default async function getPayItemLookup(pin: string) {
  const lookups = await axios.get(
    `https://gis.horrocks.com/arcgis/rest/services/UDOTDigitalDelivery/All_Digital_Delivery/MapServer/136/query?where=pin=${pin}&outFields=*&returnGeometry=false&f=json`
  );
  return lookups.data.features.reduce((obj: any, feature: any) => {
    obj[feature.attributes.item_num] = feature.attributes;
    return obj;
  }, {});
}

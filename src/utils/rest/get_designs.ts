import axios from "axios";

const getPage = (offset: number, url: string) => {
  return axios.get(`${url}&resultOffset=${offset}`);
};

const getLineDesigns = async (pin: string) => {
  const url = `https://gis.horrocks.com/arcgis/rest/services/UDOTDigitalDelivery/All_Digital_Delivery/MapServer/131/query?where=pin='${pin}'&outFields=guid&returnGeometry=false&f=json`;
  const totalReq = await axios.get(
    `https://gis.horrocks.com/arcgis/rest/services/UDOTDigitalDelivery/All_Digital_Delivery/MapServer/131/query?where=pin='${pin}'&outFields=guid&returnGeometry=false&f=json&returnCountOnly=true`
  );
  const total = totalReq.data.count;
  let promises = [];
  for (let i = 0; i < total; i += 2000) {
    const page = await getPage(i, url);
    promises.push(
      page.data.features
        .map((ele: any) => ele.attributes.guid)
        .filter((ele: any) => ele !== null)
    );
  }
  return await Promise.all(promises).then((values) => {
    return values.flat(1);
  });
};

const getPolyDesigns = async (pin: string) => {
  const url = `https://gis.horrocks.com/arcgis/rest/services/UDOTDigitalDelivery/All_Digital_Delivery/MapServer/132/query?where=pin='${pin}'&outFields=guid&returnGeometry=false&f=json`;
  const totalReq = await axios.get(
    `https://gis.horrocks.com/arcgis/rest/services/UDOTDigitalDelivery/All_Digital_Delivery/MapServer/132/query?where=pin='${pin}'&outFields=guid&returnGeometry=false&f=json&returnCountOnly=true`
  );
  const total = totalReq.data.count;
  let promises = [];
  for (let i = 0; i < total; i += 2000) {
    const page = await getPage(i, url);
    promises.push(
      page.data.features
        .map((ele: any) => ele.attributes.guid)
        .filter((ele: any) => ele !== null)
    );
  }
  return await Promise.all(promises).then((values) => {
    return values.flat(1);
  });
};

export default async function getAllGuids(pin: string) {
  const lineGuids = await getLineDesigns(pin);
  const polyGuids = await getPolyDesigns(pin);
  return lineGuids.concat(polyGuids);
}

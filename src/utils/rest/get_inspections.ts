import axios from "axios";

const getPage = (offset: number, url: string) => {
  return axios.get(`${url}&resultOffset=${offset}`);
};

const getInspLines = async (udot_pin: string) => {
  const url = `https://gis.horrocks.com/arcgis/rest/services/UDOTDigitalDelivery/All_Digital_Delivery/MapServer/129/query?where=related_globalid+IS+NOT+NULL+AND+udot_pin=${udot_pin}&outFields=related_globalid&returnGeometry=false&returnCountOnly=false&resultRecordCount=2000&f=json`;
  const totalReq = await axios.get(
    `https://gis.horrocks.com/arcgis/rest/services/UDOTDigitalDelivery/All_Digital_Delivery/MapServer/129/query?where=related_globalid+IS+NOT+NULL+AND+udot_pin=${udot_pin}&outFields=related_globalid&returnGeometry=false&returnCountOnly=true&resultRecordCount=2000&f=json`
  );
  const total = totalReq.data.count;
  let promises = [];
  for (let i = 0; i < total; i += 2000) {
    const page = await getPage(i, url);

    promises.push(
      page.data.features
        .map((ele: any) => ele.attributes.related_globalid)
        .filter((ele: any) => ele !== null)
    );
  }
  return await Promise.all(promises).then((values) => {
    return values.flat(1);
  });
};
const getInspPolys = async (udot_pin: string) => {
  const url = `https://gis.horrocks.com/arcgis/rest/services/UDOTDigitalDelivery/All_Digital_Delivery/MapServer/130/query?where=related_globalid+IS+NOT+NULL+AND+udot_pin=${udot_pin}&outFields=related_globalid&returnGeometry=false&returnCountOnly=false&resultRecordCount=2000&f=json`;
  const totalReq = await axios.get(
    `https://gis.horrocks.com/arcgis/rest/services/UDOTDigitalDelivery/All_Digital_Delivery/MapServer/130/query?where=related_globalid+IS+NOT+NULL+AND+udot_pin=${udot_pin}&outFields=related_globalid&returnGeometry=false&returnCountOnly=true&resultRecordCount=2000&f=json`
  );
  const total = totalReq.data.count;
  let promises = [];
  for (let i = 0; i < total; i += 2000) {
    const page = await getPage(i, url);

    promises.push(
      page.data.features
        .map((ele: any) => ele.attributes.related_globalid)
        .filter((ele: any) => ele !== null)
    );
  }
  return await Promise.all(promises).then((values) => {
    return values.flat(1);
  });
};

const getInspPoints = async (udot_pin: string) => {
  const url = `https://gis.horrocks.com/arcgis/rest/services/UDOTDigitalDelivery/All_Digital_Delivery/MapServer/128/query?where=related_globalid+IS+NOT+NULL+AND+udot_pin=${udot_pin}&outFields=related_globalid&returnGeometry=false&returnCountOnly=false&resultRecordCount=2000&f=json`;
  const totalReq = await axios.get(
    `https://gis.horrocks.com/arcgis/rest/services/UDOTDigitalDelivery/All_Digital_Delivery/MapServer/128/query?where=related_globalid+IS+NOT+NULL+AND+udot_pin=${udot_pin}&outFields=related_globalid&returnGeometry=false&returnCountOnly=true&resultRecordCount=2000&f=json`
  );
  const total = totalReq.data.count;
  let promises = [];
  for (let i = 0; i < total; i += 2000) {
    const page = await getPage(i, url);
    promises.push(
      page.data.features
        .map((ele: any) => ele.attributes.related_globalid)
        .filter((ele: any) => ele !== null)
    );
  }
  return await Promise.all(promises).then((values) => {
    return values.flat(1);
  });
};

export default async function getAllInspectionsByudot_pin(udot_pin: string) {
  const points = await getInspPoints(udot_pin);
  const lines = await getInspLines(udot_pin);
  const polys = await getInspPolys(udot_pin);
  console.log(points.length, lines.length, polys.length);
  return points.concat(lines, polys);
}

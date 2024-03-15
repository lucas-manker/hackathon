import axios from "axios";

const getPage = (offset: number, url: string) => {
  return axios.get(`${url}&resultOffset=${offset}`);
};

export const getPayItemRelatedGuids = async () => {
  const url =
    "https://gis.horrocks.com/arcgis/rest/services/UDOTDigitalDelivery/All_Digital_Delivery/MapServer/135/query?where=related_guid+IS+NOT+NULL+AND+item+LIKE+%27%25pay%25%27&text=&objectIds=&time=&timeRelation=esriTimeRelationOverlaps&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=related_guid&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultRecordCount=&returnExtentOnly=false&sqlFormat=none&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json";
  const totalReq = await axios.get(
    "https://gis.horrocks.com/arcgis/rest/services/UDOTDigitalDelivery/All_Digital_Delivery/MapServer/135/query?where=related_guid+IS+NOT+NULL+AND+item+LIKE+%27%25pay%25%27&text=&objectIds=&time=&timeRelation=esriTimeRelationOverlaps&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=related_guid&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=true&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultRecordCount=&returnExtentOnly=false&sqlFormat=none&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json"
  );
  const total = totalReq.data.count;
  let promises = [];
  for (let i = 0; i < total; i += 2000) {
    const page = await getPage(i, url);

    promises.push(
      page.data.features
        .map((ele: any) => ele.attributes.related_guid)
        .filter((ele: any) => ele !== null)
    );
  }
  return await Promise.all(promises).then((values) => {
    return values.flat(1);
  });
};

export const getPayItemsForProject = async (pin: string) => {
  const url = `https://gis.horrocks.com/arcgis/rest/services/UDOTDigitalDelivery/All_Digital_Delivery/MapServer/135/query?where=related_guid+IS+NOT+NULL+AND+item+LIKE+%27%25pay%25%27+AND+pin='${pin}'&outFields=related_guid&returnGeometry=false&returnCountOnly=false&resultRecordCount=2000&f=json`;
  const totalReq = await axios.get(
    `https://gis.horrocks.com/arcgis/rest/services/UDOTDigitalDelivery/All_Digital_Delivery/MapServer/135/query?where=related_guid+IS+NOT+NULL+AND+item+LIKE+%27%25pay%25%27+AND+pin='${pin}'&text&objectIds&time&timeRelation=esriTimeRelationOverlaps&geometry&geometryType=esriGeometryEnvelope&inSR&spatialRel=esriSpatialRelIntersects&distance&units=esriSRUnit_Foot&relationParam&outFields=related_guid&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset&geometryPrecision&outSR&havingClause&returnIdsOnly=false&returnCountOnly=true&orderByFields&groupByFieldsForStatistics&outStatistics&returnZ=false&returnM=false&gdbVersion&historicMoment&returnDistinctValues=false&resultRecordCount&returnExtentOnly=false&sqlFormat=none&datumTransformation&parameterValues&rangeValues&quantizationParameters&featureEncoding=esriDefault&f=json`
  );
  const total = totalReq.data.count;
  let promises = [];
  for (let i = 0; i < total; i += 2000) {
    const page = await getPage(i, url);
    promises.push(
      page.data.features
        .map((ele: any) => ele.attributes.related_guid)
        .filter((ele: any) => ele !== null)
    );
  }
  return await Promise.all(promises).then((values) => {
    return values.flat(1);
  });
};

export const getPayItemsForProjectAllFields = async (pin: string) => {
  const url = `https://gis.horrocks.com/arcgis/rest/services/UDOTDigitalDelivery/All_Digital_Delivery/MapServer/135/query?where=related_guid+IS+NOT+NULL+AND+item+LIKE+%27%25pay%25%27+AND+pin='${pin}'&outFields=*&returnGeometry=false&returnCountOnly=false&resultRecordCount=2000&f=json`;
  const totalReq = await axios.get(
    `https://gis.horrocks.com/arcgis/rest/services/UDOTDigitalDelivery/All_Digital_Delivery/MapServer/135/query?where=related_guid+IS+NOT+NULL+AND+item+LIKE+%27%25pay%25%27+AND+pin='${pin}'&text&objectIds&time&timeRelation=esriTimeRelationOverlaps&geometry&geometryType=esriGeometryEnvelope&inSR&spatialRel=esriSpatialRelIntersects&distance&units=esriSRUnit_Foot&relationParam&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset&geometryPrecision&outSR&havingClause&returnIdsOnly=false&returnCountOnly=true&orderByFields&groupByFieldsForStatistics&outStatistics&returnZ=false&returnM=false&gdbVersion&historicMoment&returnDistinctValues=false&resultRecordCount&returnExtentOnly=false&sqlFormat=none&datumTransformation&parameterValues&rangeValues&quantizationParameters&featureEncoding=esriDefault&f=json`
  );
  const total = totalReq.data.count;
  let promises = [];
  for (let i = 0; i < total; i += 2000) {
    const page = await getPage(i, url);
    promises.push(
      page.data.features.filter(
        (ele: any) => ele.attributes.related_guid !== null
      )
    );
  }
  return await Promise.all(promises).then((values) => {
    return values.flat(1).reduce((obj: any, feature: any) => {
      if (Object.keys(obj).includes(feature.attributes.related_guid)) {
        obj[feature.attributes.related_guid].push(feature.attributes);
      } else {
        obj[feature.attributes.related_guid] = [feature.attributes];
      }
      return obj;
    }, {});
  });
};

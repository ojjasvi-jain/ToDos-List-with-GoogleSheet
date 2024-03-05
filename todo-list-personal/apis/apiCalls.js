import axios from "axios";

const BASEURL = "https://api.apico.dev/v1/WmoeH8/";

const sheetid = "1_dsXH5kw22_MUG6FcyEi1jltH2bWiOtSGgwQlHpPZJM";
const sheetName = "Sheet1";

// Fetch data form excel sheet

const fetchData = async () => {
  try {
    let response = await axios.get(`${BASEURL}${sheetid}/values/${sheetName}`);
    return response.data.values;
  } catch (e) {
    console.log(e);
  }
};

const updateData = async (lineNo, data) => {
  try {
    // let response = await axios.put({
    //   method: "PUT",
    //   url: ,
    //   params: {
    //     valueInputOption: "USER_ENTERED",
    //     includeValuesInResponse: true,
    //   },
    //   data: {
    //     values: data,
    //   },
    // });

    console.log("========== data", lineNo, data);

    let response = await axios.put(
      `${BASEURL}${sheetid}/values/${sheetName}!A${lineNo + 1}`,
      {
        range: `${sheetName}!A${lineNo + 1}`,
        majorDimension: "ROWS",
        values: [data],
      },
      {
        params: {
          valueInputOption: "USER_ENTERED",
          includeValuesInResponse: true,
        },
      }
    );
    return response.data.values;
  } catch (e) {
    console.log(e);
  }
};

const addDataToDatabase = async (data) => {
  try {
    axios
      .post(
        `${BASEURL}${sheetid}/values/${sheetName}:append`,
        {
          values: [data],
        },
        {
          params: {
            valueInputOption: "USER_ENTERED",
            insertDataOption: "INSERT_ROWS",
            includeValuesInResponse: true,
          },
        }
      )
      .then((data) => {});
  } catch (e) {
    console.log(e);
  }
};

// https://api.apico.dev/v1/WmoeH8/1_dsXH5kw22_MUG6FcyEi1jltH2bWiOtSGgwQlHpPZJM/values/Sheet1!A5

// update the data on excelsheet

// delete the data from excael sheet

export { fetchData, updateData, addDataToDatabase };

// 5334670010868616

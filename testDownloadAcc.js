const db = require("./models/index");
const {
  downloadAccount,
} = require("./components/account/service/downloadAccount");

const timestamp = Date.now();
const accountListId = "187b6da2-fabe-4917-9475-8265c525e22d";
const bucketName = "nexsales_file_upload";
const filePath = `swabhav/download/account/${timestamp}.csv`;

downloadAccount({
  accountListId,
  bucketName,
  filePath,
})
  .then((url) => {
    console.log("Successfully Downloaded");
    console.log(url);
    return db.AccountList.update(
      { downloadFileLink: url },
      {
        where: { id: accountListId },
      }
    );
  })
  .then(() => {
    console.log("Successfully Link Saved");
  })
  .catch((error) => {
    console.error("Get Error While Downloading Accounts");
    console.error(error);
  });

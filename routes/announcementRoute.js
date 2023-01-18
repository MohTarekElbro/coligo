const express = require("express");

const {
  createAnnouncement,
  getAnnouncements,
  getAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../services/announcementService");

const router = express.Router();

router.route("/").get(getAnnouncements).post(createAnnouncement);
router
  .route("/:id")
  .get(getAnnouncement)
  .put(updateAnnouncement)
  .delete(deleteAnnouncement);

module.exports = router;

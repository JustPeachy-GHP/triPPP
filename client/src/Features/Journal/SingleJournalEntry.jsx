import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  fetchSingleJournal,
  deleteJournal,
} from "../../../src/helpers/journals";
import { Link } from "react-router-dom";
import JournalNavbar from "./JournalNavbar";
import EditJournalForm from "./EditJournalForm";
import "./Journal.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SingleJournal() {
  const params = useParams();
  const navigate = useNavigate();
  const [journal, setJournal] = useState({});
  const [isDeleted, setIsDeleted] = useState(false);

  const [expanded, setExpanded] = useState(false);

  async function getSingleJournal() {
    try {
      setJournal(await fetchSingleJournal(params.journal_id));
    } catch (error) {
      console.log("Trouble getting single journal", error);
    }
  }

  useEffect(() => {
    getSingleJournal();
  }, []);

  // DELETE journal
  const handleDelete = async (journal_id) => {
    try {
      const response = await deleteJournal(journal_id);
      setIsDeleted(true); // Set the state to indicate that the journal is deleted
    } catch (error) {
      console.error("Trouble deleting journal", error);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className="single-journal-container font-montserrat"
      style={{ marginTop: "100px" }}
    >
      <JournalNavbar />
      {isDeleted ? (
        <div>
          <h4 className="journal-title font-montserrat">Journal Deleted</h4>
        </div>
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h4" className="journal-title font-montserrat">
              {journal.title}
            </Typography>
            <Typography
              variant="body1"
              className="journal-entry font-montserrat"
            >
              Entry: {journal.entry}
            </Typography>
            <div className="image-container">
              <img
                className="mx-auto my-4 max-w-full h-auto"
                src={journal.image}
                alt={journal.title}
              />
            </div>
          </CardContent>
          <CardActions>
            <div style={{ flex: 1 }}>
              {" "}
              {/* Create a flex container */}
              <div
                style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
              >
                {" "}
                {/* Create a flex container for icons */}
                <IconButton
                  aria-label="add to favorites"
                  onClick={handleExpandClick}
                >
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </div>
              <div>
                <Link to={`/journals/${params.journal_id}/edit`}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#8fa69d", color: "white" }}
                    className="edit-button my-2"
                  >
                    Edit
                  </Button>
                </Link>
              </div>
              <div>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#8fa69d",
                    color: "white",
                    marginTop: "15px",
                  }}
                  onClick={() => {
                    const shouldDelete = window.confirm(
                      "Are you sure you want to delete this journal?"
                    );
                    if (shouldDelete) {
                      handleDelete(journal.journal_id);
                      navigate(`/journals`);
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </CardActions>
          <CardActions disableSpacing>
            <IconButton aria-label="expand more" onClick={handleExpandClick}>
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          {expanded && (
            <CardContent>
              <Typography paragraph>Extra Info:</Typography>
            </CardContent>
          )}
        </Card>
      )}
    </div>
  );
}

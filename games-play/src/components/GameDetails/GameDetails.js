import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { gameServiceFactory } from "../../services/gameService";
import { useService } from "../../hooks/useService";
import { AuthContext } from "../../contexts/AuthContext";

export const GameDetails = () => {
    const {userId} = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [comment, setComment] = useState("");
    const { gameId } = useParams();
    const [game, setGame] = useState({});
    const gameService =  useService(gameServiceFactory);
    const navigate = useNavigate();
    useEffect(() => {
        gameService.getOne(gameId).then((res) => {
            console.log(res);
            setGame(res);
        });
    }, [gameId]);

    const onCommentSubmit = async (e) => {
        e.preventDefault();
        const result = await gameService.addComment(gameId, {
            username,
            comment,
        });

        setGame((state) => ({
            ...state,
            comments: { ...state.comments, [result._id]: result },
        }));
        setUsername("");
        setComment("");
    };

    const onDeleteClick = async () => {

//TODO: DELETE FROM STATE
        await gameService.delete(game._id);
       navigate('/catalog');
    }
 
    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">{game.summary}</p>

                {/* <!-- Bonus ( for Guests and Users ) --> */}
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {game.comments &&
                            Object.values(game.comments).map((x) => (
                                <li key={x._id} className="comment">
                                    <p>
                                        {x.username}: {x.comment}
                                    </p>
                                </li>
                            ))}
                    </ul>

                    {!game.comments && (
                        <p className="no-comment">No comments.</p>
                    )}
                </div>

                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                {game._ownerId === userId && (
                <div className="buttons">
                <Link to={`/catalog/${gameId}/edit`} className="button">
                    Edit
                </Link>
                <button onClick={onDeleteClick} className="button">
                    Delete
                </button>
            </div>
                )}

            </div>

            {/* <!-- Bonus --> */}
            {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={onCommentSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Pesho"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <input
                        className="btn submit"
                        type="submit"
                        value="Add Comment"
                    />
                </form>
            </article>
        </section>
    );
};

// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { getUser } from '../../redux/selectors';

// type Props = {
//   ticket: TTicket
// }

// export default function Ticket({ ticket }: Props) {
//   const user = useSelector(getUser);

//   return (
//     !!ticket && (
//     <div>
//       <h1>{ticket.title}</h1>
//       {
//         ticket.author.id === user.id && <Link to={`/tickets/edit/${ticket.id}`}>
// Edit ticket</Link>
//       }
//     </div>
//     )
//   );
// }

import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import { FlexContainer } from '../../styles';
import { TicketContainer } from './styles';

const dateOptions = {
  year: 'numeric', month: 'long', day: 'numeric',
} as const;
const timeOptions = {
  hour: 'numeric',
  minute: 'numeric',
} as const;

type Props = {
  ticket: TTicket
  isAuthor: boolean
  handleDelete: () => void
}

export default function Ticket({ ticket, isAuthor, handleDelete }: Props) {
  return (
    <TicketContainer>
      <CardHeader
        action={(
          isAuthor && (
          <IconButton onClick={handleDelete} aria-label="settings">
            <DeleteIcon />
          </IconButton>
          )
        )}
        title={new Date(ticket.createdAt).toLocaleDateString(undefined, dateOptions)}
        subheader={
              new Date(ticket.createdAt).toLocaleTimeString(undefined, timeOptions)
        }
      />
      <CardContent>
        <Typography variant="body1">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Updated
          {' '}
          {moment.utc(ticket.updatedAt || ticket.createdAt).fromNow()}
        </Typography>
        <FlexContainer mt={3}>
          <Avatar src={ticket.author.photoURL} alt={ticket.author.displayName} />
          <Typography variant="body1">{ticket.author.displayName}</Typography>
        </FlexContainer>
      </CardContent>
    </TicketContainer>
  );
}

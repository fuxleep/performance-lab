import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateTicket } from '../redux/thunks/tickets';
import Form from '../components/Form/Form';
import { getTicket } from '../redux/selectors';

function Edit() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const ticket = useSelector(getTicket(id));

  const onSubmit = (data: Partial<TTicket>) => dispatch(updateTicket(data));

  return <Form ticket={ticket} onSubmit={onSubmit} />;
}

export default Edit;
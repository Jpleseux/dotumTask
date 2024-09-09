import { ChangeEvent, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../public/style/accounts/newAccount.css';
import { GatewayContext } from '../../gateway/gatewayContext';
import Message from '../../components/visual/Message.component';
import { AccountEntity } from '../../entities/accounts/account.entity';

function NewAccount() {
  const [account, setAccount] = useState({
    name: '',
    description: '',
    value: 0,
    expirationDate: '',
    accountType: 'pay' as "pay" | "receive"
  });

  const [msg, setMsg] = useState({ msg: null, status: null });
  const [isSubmitting, setIsSubmitting] = useState(false);  // Novo estado para controlar o envio

  const navigate = useNavigate();
  const gatewayContext = useContext(GatewayContext);
  const accountsGateway = gatewayContext?.accountGateway; // Presumindo que você tenha um accountsGateway

  const handleOnChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAccount((prevState) => ({
      ...prevState,
      [name]: name === 'value' ? parseFloat(value) : value
    }));
  };

  const handleAccountTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAccount((prevState) => ({
      ...prevState,
      accountType: e.target.value as "pay" | "receive"
    }));
  };

  async function submit() {
    setMsg({ msg: null, status: null });
    if (!account.name || !account.description || !account.value || !account.expirationDate) {
      setMsg({ msg: "Todos os campos devem ser preenchidos", status: 400 });
    } else {
      setIsSubmitting(true);  // Desabilita o botão de envio
        const response = await accountsGateway?.createNewAccount(new AccountEntity(account));
        setMsg({ msg: response?.message, status: response?.status });

        if (response?.status < 300) {
          setTimeout(() => {
            navigate("/home/index");
          }, 3000);
        } else {
            setIsSubmitting(false);
        }
    }
  }

  return (
    <div className="newaccount">
      {msg.msg && <Message msg={msg.msg} status={msg.status} timers={3000} />}
      <div className="modal__header">
        <span className="modal__title">Novo Registro de Conta/Gasto</span>
      </div>
      <div className="modal__body">
        {/* Campos de input */}
        <div className="input-post">
          <label className="input__label" htmlFor="name">Nome da Conta</label>
          <input type="text" className="input__field" id="name" name="name" placeholder="Nome" onChange={handleOnChange} />
        </div>
        <div className="input-post">
          <label className="input__label" htmlFor="description">Descrição</label>
          <textarea onChange={handleOnChange} rows={5} className="input__field input__field--textarea" id="description" name="description" placeholder='Descreva o registro.'></textarea>
        </div>
        <div className="input-post">
          <label className="input__label" htmlFor="value">Valor</label>
          <input type="number" className="input__field" id="value" name="value" placeholder="Valor" onChange={handleOnChange} />
        </div>
        <div className="input-post">
          <label className="input__label" htmlFor="expirationDate">Data de Expiração</label>
          <input type="date" className="input__field" id="expirationDate" name="expirationDate" onChange={handleOnChange} />
        </div>
        <div className="input-post">
          <label className="input__label" htmlFor="accountType">Tipo de Conta</label>
          <select className="input__field" id="accountType" name="accountType" onChange={handleAccountTypeChange}>
            <option value="pay">Pagar</option>
            <option value="receive">Receber</option>
          </select>
        </div>
      </div>
      <div className="modal__footer button-post">
        <button className="btn btn-secondary" onClick={submit} disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Salvar"}
        </button>
        <a href='/home/index'><button className="btn btn-danger">Cancelar</button></a>
      </div>
    </div>
  );
}

export default NewAccount;

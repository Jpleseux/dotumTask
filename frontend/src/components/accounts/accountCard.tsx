import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GatewayContext } from '../../gateway/gatewayContext';
import { AccountEntity } from '../../entities/accounts/account.entity';
import ConfirmationDialog from '../../components/confirmDialog/confirmDialog';
import './accountCard.css';
import Message from '../visual/Message.component';

type AccountCardProps = {
  account: AccountEntity;
};

function AccountCard({ account }: AccountCardProps) {
  const navigate = useNavigate();
  const gatewayContext = useContext(GatewayContext);
  const accountGateway = gatewayContext?.accountGateway;
  const [msg, setMsg] = useState({ msg: null, status: null });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false); // Novo estado para o diálogo de pagamento
  const [isDone, setIsDone] = useState(account.isDone()); // Novo estado para controlar se a conta foi finalizada
  const isLate = new Date(account.expirationDate()) < new Date(Date.now());

  const handleMoreInfo = () => {
    navigate(`/home/account/${account.uuid()}`);
  };

  const handlePayment = async () => {
    try {
      const response = await accountGateway?.finshAccount(account.uuid());
      setMsg({ msg: response?.message, status: response?.status });
      
      if (response?.status <= 300) {
        setIsDone(true); 
        navigate(0);
      }
    } catch (error) {
      setMsg({ msg: "Erro ao finalizar a conta", status: 500 });
    }

    setShowPaymentDialog(false);
  };

  const handleDelete = () => {
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    const response = await accountGateway?.deleteAccount(account.uuid());
    setMsg({ msg: response?.message, status: response?.status });
    if (response?.status <= 300) {
      navigate(0);
    }
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false);
  };

  const handleConfirmPayment = () => {
    setShowPaymentDialog(true);
  };

  const cancelPayment = () => {
    setShowPaymentDialog(false);
  };

  return (
    <div className={`account-card ${account.accountType()}`}>
      {msg.msg && <Message msg={msg.msg} status={msg.status} timers={3000} />}
      <h3 className="account-card__title">{account.name()}</h3>
      {account.isDone() === false &&
      <p className="account-card__late-warning">
      Conta à {account.accountType() === "receive" ? "Receber" : "Pagar"}
      </p>
      }
      {account.isDone() === true&&
      <p className="account-card__late-warning">
      Conta {account.accountType() === "receive" ? "foi recebida" : "foi paga"}
      </p>
      }
      <p className="account-card__description">{account.description()}</p>
      <p className="account-card__value">Valor: R$ {account.value()}</p>
      <p className="account-card__expiration">
        Data de Expiração: {new Date(account.expirationDate()).toLocaleDateString()}
      </p>
      {isLate && (
        <p className="account-card__late-warning">⚠️ Esta conta está atrasada!</p>
      )}
      <div className="account-card__buttons">
        {!isDone && (
          <button className="account-card__button m-4" style={{ backgroundColor: "green" }} onClick={handleConfirmPayment}>
            {account.accountType() === "pay" ? "Pagar" : "Receber"}
          </button>
        )}
        <button className="account-card__button m-4" style={{ backgroundColor: "red" }} onClick={handleDelete}>
          Deletar
        </button>
        <button className="account-card__button edit m-4" onClick={handleMoreInfo}>
          Editar
        </button>
      </div>
      {showConfirmDialog && (
        <ConfirmationDialog
          message="Tem certeza de que deseja deletar esta conta?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      {showPaymentDialog && (
        <ConfirmationDialog
          message={`Tem certeza de que deseja ${account.accountType() === "pay" ? "pagar" : "receber"} esta conta?`}
          onConfirm={handlePayment}
          onCancel={cancelPayment}
        />
      )}
    </div>
  );
}

export default AccountCard;

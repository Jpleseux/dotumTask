import React, { useEffect, useState, useContext, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../../public/style/accounts/accountDetails.css";
import { GatewayContext } from "../../gateway/gatewayContext";
import { AccountEntity } from "../../entities/accounts/account.entity";
import ReactLoading from "react-loading";
import Message from "../../components/visual/Message.component";

function AccountEdit() {
  const { uuid } = useParams<{ uuid: string }>();
  const [msg, setMsg] = useState({ msg: null, status: null });
  const [account, setAccount] = useState<AccountEntity | null>(null);
  const [loading, setLoading] = useState(false);
  const [originalAccount, setOriginalAccount] = useState<AccountEntity | null>(null);
  const gatewayContext = useContext(GatewayContext);
  const accountGateway = gatewayContext?.accountGateway;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAccount() {
      setLoading(true);
      const response = await accountGateway?.getOneAccount(uuid as "");
      setAccount(response?.account as AccountEntity);
      setOriginalAccount(response?.account as AccountEntity);
      setLoading(false);
    }
    fetchAccount();
  }, [uuid, accountGateway]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount((prevState) => {
      if (!prevState) return prevState;

      const updatedAccount = new AccountEntity({
        ...prevState.props,
        [name]: value,
      });

      return updatedAccount;
    });
  };

  const handleUpdate = async () => {
    setLoading(true);
    if (account) {
      const response = await accountGateway?.updateAccount(account);
      setMsg({ msg: response?.message, status: response?.status });
      if (response?.status <= 300) {
        setTimeout(() => {
          navigate("/home/index");
        }, 3000);
      }
    }
    setLoading(false);
  };

  const cancelEdit = () => {
    setAccount(originalAccount);
    navigate("/home/index");
  };

  if (loading) {
    return (
      <div className="col-sm-12 d-flex justify-content-center align-items-center m-4">
        <ReactLoading type="spokes" height={"20%"} width={"30%"} />
      </div>
    );
  }

  if (!account) {
    return <div>Conta não encontrada</div>;
  }

  return (
    <div className="container light-style flex-grow-1 container-p-y">
      {msg.msg && <Message msg={msg.msg} status={msg.status} timers={3000} />}
      <h4 className="font-weight-bold py-3 mb-4">Editar Conta</h4>
      <div className="card overflow-hidden">
        <div className="card-body">
          <div className="form-group">
            <label className="form-label">Nome</label>
            <input
              type="text"
              className="form-control mb-1"
              name="name"
              value={account.name()}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Descrição</label>
            <input
              type="text"
              className="form-control mb-1"
              name="description"
              value={account.description()}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Valor</label>
            <input
              type="number"
              className="form-control mb-1"
              name="value"
              value={account.value()}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Tipo</label>
            <input
              type="text"
              className="form-control mb-1"
              value={account.accountType() === "pay" ? "A Pagar" : "A Receber"}
              disabled
            />
          </div>
        </div>
        <div className="text-center m-4">
          <button type="button" className="btn btn-primary m-2" onClick={handleUpdate}>
            Salvar alterações
          </button>
          <button type="button" className="btn btn-secondary m-2" onClick={cancelEdit}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountEdit;

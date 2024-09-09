import { useContext, useEffect, useState } from "react";
import CookieFactory from "../../utils/cookieFactory";
import "../../../public/style/main/index.css";
import { GatewayContext } from "../../gateway/gatewayContext";
import { MdGroup, MdOutlinePostAdd } from "react-icons/md";
import ReactLoading from 'react-loading';
import { AccountEntity } from "../../entities/accounts/account.entity";
import AccountCard from "../../components/accounts/accountCard";

export type Avatar = {
  email: string;
  password: string;
  token: string;
  uuid: string;
  userName: string;
};

function Index() {
  const factory = new CookieFactory();
  const [user, setUser] = useState<Avatar>({
    email: "",
    uuid: "",
    userName: "",
    token: "",
    password: "",
  });
  const [accounts, setAccounts] = useState<AccountEntity[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<AccountEntity[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "pay" | "receive">("all");
  const [showDone, setShowDone] = useState(false); // Filtro para contas finalizadas
  const [showNotDone, setShowNotDone] = useState(false); // Filtro para contas não pagas

  const gatewayContext = useContext(GatewayContext);
  const gateway = gatewayContext?.userGateway;
  const accountGateway = gatewayContext?.accountGateway;

  async function getCookie(): Promise<Avatar> {
    return await factory.getCookie("user");
  }

  async function getAccounts() {
    const response = await accountGateway?.getAllAccountsByUser();
    setAccounts(response?.accounts ?? []);
    setFilteredAccounts(response?.accounts ?? []);
  }

  async function findUser() {
    setLoading(true);
    const response = await gateway?.findUserByEmail();
    setUser({
      uuid: response?.user?.uuid() ?? "",
      email: response?.user?.email() ?? "",
      password: response?.user?.password() ?? "",
      userName: response?.user?.userName() ?? "",
      token: "",
    });
    setLoading(false);
  }

  useEffect(() => {
    getCookie();
    getAccounts();
    findUser();
  }, []);

  useEffect(() => {
    let filtered = accounts;

    // Filtra por tipo de conta (pagar, receber, todas)
    if (filter !== "all") {
      filtered = filtered.filter((account) => account.accountType() === filter);
    }

    // Filtra por contas finalizadas
    if (showDone) {
      filtered = filtered.filter((account) => account.isDone());
    }

    // Filtra por contas não finalizadas
    if (showNotDone) {
      filtered = filtered.filter((account) => !account.isDone());
    }

    setFilteredAccounts(filtered);
  }, [filter, showDone, showNotDone, accounts]);

  const totalValue = filteredAccounts.reduce((sum, account) => sum + account.value(), 0);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-18 col-sm-offset-4">
          <div className="panel panel profile-widget mt-4">
            {!loading && (
              <div className="row">
                <div className="col-sm-12">
                  <div
                    className="image-container bg2"
                    style={{
                      background: "url(../../../public/imgs/backgroundProfile.jpg)",
                      width: "100%",
                    }}
                  ></div>
                </div>
                <div className="col-sm-12">
                  <div className="details">
                    <h4>
                      Olá {user.userName}
                      <i className="fa fa-shield"></i>
                    </h4>
                    <div>Email: {user.email}</div>
                    <div className="m-4">
                      <a href="/home/new/account">
                        <button>
                          <MdOutlinePostAdd /> Cadastrar nova conta
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="summary-container">
              <h4>Resumo de Contas</h4>
              <p>Quantidade de Contas: {filteredAccounts.length}</p>
              <p>Valor Total: R$ {totalValue.toFixed(2)}</p>
              <div className="filter-container">
                <label htmlFor="filter">Filtrar por:</label>
                <select
                  id="filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as "all" | "pay" | "receive")}
                >
                  <option value="all">Todas</option>
                  <option value="pay">A Pagar</option>
                  <option value="receive">A Receber</option>
                </select>

                <label htmlFor="doneFilter" className="m-4">
                  <input
                    type="checkbox"
                    id="doneFilter"
                    checked={showDone}
                    onChange={() => setShowDone(!showDone)}
                  />
                  Mostrar apenas finalizadas
                </label>

                <label htmlFor="notDoneFilter" className="m-4">
                  <input
                    type="checkbox"
                    id="notDoneFilter"
                    checked={showNotDone}
                    onChange={() => setShowNotDone(!showNotDone)}
                  />
                  Mostrar apenas não finalizadas
                </label>
              </div>
            </div>
          </div>

          {filteredAccounts.length > 0 &&
            filteredAccounts.map((account, index) => (
              <AccountCard account={account} key={index} />
            ))}
          
          <div className="row">
            <div className="col-sm-12">
              {loading && (
                <div className="col-sm-12 d-flex justify-content-center align-items-center m-4">
                  <ReactLoading type="spin" height={"20%"} width={"30%"} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;

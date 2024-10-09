import React from "react";
import { Link } from "react-router-dom";
import { Card, Divider, Tag, Button } from "antd";
import pro from "../../assets/images/housekeeper.png";
import logo from "../../assets/images/logo.svg";

const Transactiondetail = () => {
  return (
    <>
      <Link to="/orderdetail">
        <Card
          title={
            <>
              <div className="flex justify-between p-2">
                <img src={pro} className="w-14 h-14 hidden md:flex" />
                <div className="my-auto ml-4">
                  <p>
                    अर्डर आईडी:<span className="ml-4"> #२३४२३४ </span>
                  </p>
                  <p>
                    २०२४/२/१ बुधबार<span className="ml-4">१२:४५</span>
                  </p>
                </div>
                <div>
                  <Tag color="green">पूरा वितरण</Tag>
                </div>
              </div>
            </>
          }
          className="col-span-1"
        >
          <div>
            <p className="flex justify-between">
              आलु: <span>२ किलो</span>
            </p>
            <p className="flex justify-between">
              टमाटर: <span>५ किलो</span>
            </p>
            <p className="flex justify-between">
              फूलगोभी: <span>३ किलो </span>
            </p>
            <Divider />
            <p className="flex justify-between">
              कुल<span>३५२ रुपैयाँ</span>
            </p>
          </div>
        </Card>
      </Link>
      <Link to="/invoice">
        <Button type="primary" className="mt-4">
          इनभ्वाइस डाउनलोड गर्नुहोस
        </Button>
      </Link>
      <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
        <div className="sm:w-11/12 lg:w-3/4 mx-auto">
          <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl dark:bg-neutral-800">
            {/* Header Section */}
            <header className="flex justify-between">
              <div>
                <img src={logo} alt="" className="w-20 h-20" />
                <h1 className="mt-2 text-lg md:text-xl font-semibold text-blue-600 dark:text-white">
                  हाट - बजार
                </h1>
              </div>

              <div className="text-end">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-neutral-200">
                  इनभ्वाइस
                  <span className="mt-1 block text-gray-500 dark:text-neutral-500">
                    ३६८२३०३
                  </span>
                </h2>

                {/* <address className="mt-4 not-italic text-gray-800 dark:text-neutral-200">
                45 Roker Terrace
                <br />
                Latheronwheel
                <br />
                KW5 8NW, London
                <br />
                United Kingdom
                <br />
              </address> */}
              </div>
            </header>

            {/* Billing Section */}
            <section className="mt-8 grid sm:grid-cols-2 gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                  बिललाई:
                </h3>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                  सारा विलियम्स
                </h3>
                <address className="mt-2 not-italic text-gray-500 dark:text-neutral-500">
                  २८० सुजेन थ्रुवे,
                  <br />
                  Breannabury, वा ४५८०१,
                  <br />
                  संयुक्त राज्य अमेरिका
                  <br />
                </address>
              </div>

              <div className="sm:text-end space-y-2">
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                      इनभ्वाइस मिति:
                    </dt>
                    <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                      ०३/१०/२०१८
                    </dd>
                  </dl>
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                      म्याद मिति:
                    </dt>
                    <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                      ०३/११/२०१८
                    </dd>
                  </dl>
                </div>
              </div>
            </section>

            {/* Items Section */}
            <section className="mt-6">
              <div className="border border-gray-200 p-4 rounded-lg space-y-4 dark:border-neutral-700">
                <div className="hidden sm:grid sm:grid-cols-5">
                  <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    सामग्री
                  </div>
                  <div className="text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    परिमाण
                  </div>
                  <div className="text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    दर
                  </div>
                  <div className="text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    रकम
                  </div>
                </div>

                {/* Items */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  <div className="col-span-full sm:col-span-2">
                    <p className="font-medium text-gray-800 dark:text-neutral-200">
                      डिजाइन UX र UI
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-neutral-200">१</p>
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-neutral-200">५</p>
                  </div>
                  <div>
                    <p className="sm:text-end text-gray-800 dark:text-neutral-200">
                      $५००
                    </p>
                  </div>
                </div>

                {/* More items... */}
              </div>
            </section>

            {/* Total Section */}
            <section className="mt-8 flex sm:justify-end">
              <div className="w-full max-w-2xl sm:text-end space-y-2">
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                      जम्मा:
                    </dt>
                    <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                      $२७५०.००
                    </dd>
                  </dl>

                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                      कुल:
                    </dt>
                    <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                      $२७५०.००
                    </dd>
                  </dl>

                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                      कर:
                    </dt>
                    <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                      $३९.००
                    </dd>
                  </dl>

                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                      भुक्तान गरिएको रकम:
                    </dt>
                    <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                      $२७८९.००
                    </dd>
                  </dl>

                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                      बाँकी रकम:
                    </dt>
                    <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                      $०.००
                    </dd>
                  </dl>
                </div>
              </div>
            </section>

            {/* Footer Section */}
            <footer className="mt-8 sm:mt-12">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                धन्यवाद!
              </h4>
              <p className="text-gray-500 dark:text-neutral-500">
                यस इनभ्वाइस सम्बन्धी कुनै प्रश्न भएमा, निम्न सम्पर्क जानकारी
                प्रयोग गर्नुहोस्:
              </p>
              <div className="mt-2">
                <p className="block text-sm font-medium text-gray-800 dark:text-neutral-200">
                  example@site.com
                </p>
                <p className="block text-sm font-medium text-gray-800 dark:text-neutral-200">
                  +१ (०६२) १०९-९२२२
                </p>
              </div>
            </footer>

            <p className="mt-5 text-sm text-gray-500 dark:text-neutral-500">
              © २०२२ Preline.
            </p>
          </div>

          <div className="mt-5 sm:mt-10 text-end bg-primary">
            <a
              className="inline-flex justify-center items-center gap-x-3 text-center bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition py-3 px-4 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-white dark:focus:ring-offset-neutral-800"
              href="#"
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              इनभ्वाइस डाउनलोड गर्नुहोस्
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactiondetail;

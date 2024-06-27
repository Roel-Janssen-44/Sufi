import {
  Image as HydrogenImage,
  useCart,
  CartLineProvider,
  CartLineQuantity,
  CartLineQuantityAdjustButton,
  CartCheckoutButton,
} from "@shopify/hydrogen-react";
import Price from "@/components/Price";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
// import { useState, useEffect } from "react";
// import { TextField } from "@mui/material";

export default function CartDrawer({ cartDrawerIsOpen, onClose }) {
  const { cost, checkoutUrl, lines } = useCart();
  // const cart = useCart();

  // const [cartNote, setCartNote] = useState(cart?.note || "");
  // const [isInitialRender, setIsInitialRender] = useState(true);
  // console.log("cart log");
  // console.log(cart);
  // console.log("lines");
  // console.log(lines);
  // console.log("note");
  // console.log(cart.note);

  // useEffect(() => {
  //   if (!isInitialRender) return;
  //   if (cart?.note !== undefined && cart?.note !== cartNote) {
  //     setIsInitialRender(false);
  //     setCartNote(cart.note);
  //   }
  // }, [cart.note]);

  // useEffect(() => {
  //   cart.noteUpdate(cartNote);
  // }, [cartNote]);

  // const handleCartNoteChange = (value) => {
  //   setCartNote(value);
  // };

  return (
    <Drawer anchor="right" open={cartDrawerIsOpen} onClose={onClose}>
      <div className="h-screen flex flex-col w-full max-w-sm">
        <div className="mb-8 bg-primary text-white">
          <div className="flex container h-16 items-center justify-between">
            <h2 className="text-lg font-medium">Winkelmandje</h2>
            <div className="flex items-center z-40">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="close drawer"
                sx={{ mr: -1 }}
                onClick={() => onClose()}
              >
                <CloseRoundedIcon />
              </IconButton>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 overflow-hidden">
          <ul role="list" className="-my-6 divide-y divide-gray-200 mb-auto">
            {lines?.map((line) => (
              <div key={"cart_line" + line.id}>
                <CartLineProvider line={line}>
                  <li className="flex py-6">
                    <div className="h-24 relative w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <HydrogenImage
                        data={line.merchandise.image}
                        className="absolute left-1/2 top-1/2 object-scale-down w-full h-full -translate-x-1/2 -translate-y-1/2"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a
                              href={`/products/${line.merchandise.product.handle.toLowerCase()}`}
                            >
                              {line.merchandise.product.title}
                            </a>
                          </h3>
                          <p className="ml-4 min-w-[70px] text-right">
                            <Price
                              value={parseFloat(
                                line.cost.totalAmount.amount
                              ).toFixed(2)}
                            />
                          </p>
                        </div>
                        {line.merchandise.selectedOptions.map((option) => {
                          if (option.name === "Title") return null;

                          return (
                            <p
                              key={"selectedOptions_" + option.value}
                              className="mt-1 text-sm text-gray-500 font-bold"
                            >
                              {option.name}:{" "}
                              <span className="font-normal">
                                {option.value.split("WD options")[0].trim()}
                              </span>
                            </p>
                          );
                        })}

                        {line.attributes?.map((attribute) => (
                          <p
                            key={"selectedAttributes_" + attribute.value}
                            className="mt-1 text-sm text-gray-500 select-none font-bold"
                          >
                            {attribute.key.charAt(0).toUpperCase() +
                              attribute.key.toLowerCase().slice(1)}
                            :{" "}
                            <span className="break-all font-normal select-all">
                              {attribute.value}
                            </span>
                          </p>
                        ))}
                      </div>
                      <div className="flex flex-1 items-start mt-2 justify-between text-sm">
                        <p className="text-gray-500 font-bold">
                          Aantal:{" "}
                          <span className="font-normal">
                            <CartLineQuantity />
                          </span>
                        </p>

                        <CartLineQuantityAdjustButton
                          adjust="remove"
                          className="text-gray-600 hover:text-gray-500"
                        >
                          <DeleteRoundedIcon />
                        </CartLineQuantityAdjustButton>
                      </div>
                    </div>
                  </li>
                </CartLineProvider>
              </div>
            ))}
          </ul>
        </div>

        <div className="px-4 pb-8">
          {/* {lines?.length != 0 && (
            <div className="px-4 py-6 mt-auto border-b-[1px] border-gray-200 mb-4">
              <div className="flex flex-wrap items-center text-sm mb-2">
                <span className="font-bold min-w-[140px]">
                  Bestelling instructies
                </span>
              </div>
              <TextField
                className="w-full"
                onChange={(e) => {
                  handleCartNoteChange(e.target.value);
                }}
                value={cartNote}
                variant="outlined"
                multiline
                onBlur={(e) => {
                  handleCartNoteChange(e.target.value);
                }}
              />
            </div>
          )} */}

          <div className="sm:px-6 flex justify-between text-base font-medium text-gray-900">
            <p>Subtotaal:</p>
            <p>
              {cost?.subtotalAmount?.amount && (
                <Price
                  value={parseFloat(cost.subtotalAmount.amount).toFixed(2)}
                />
              )}
              {!cost?.subtotalAmount?.amount && "0.00"}
            </p>
          </div>

          {cost?.subtotalAmount?.amount != 0 && (
            <div className="px-4">
              <Button
                size="large"
                href={checkoutUrl}
                variant="contained"
                className="w-full mt-6 py-3 normal-case text-lg bg-primary text-white"
              >
                Ga door naar de kassa
              </Button>
              <div className="flex justify-center text-center text-sm text-gray-500">
                <p>
                  of{" "}
                  <Button
                    size="large"
                    href={"/collections/all"}
                    variant="text"
                    className="py-3 pl-0 normal-case"
                  >
                    ga verder met shoppen
                  </Button>
                </p>
              </div>
            </div>
          )}
          {cost?.subtotalAmount?.amount == 0 && (
            <Button
              size="large"
              href={"/collections/all"}
              variant="contained"
              className="w-full mt-6 py-3 normal-case text-lg bg-primary text-white"
            >
              Start met shoppen
            </Button>
          )}
        </div>
      </div>
    </Drawer>
  );
}

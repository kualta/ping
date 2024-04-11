"use client";

import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Button } from "../ui/button";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { Form } from "react-hook-form";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { truncateEthAddress } from "~/utils/truncateEthAddress";
import {
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";

export function ConnectWalletButton() {
  const { connectors, connect } = useConnect();

  const connectorList = connectors.map((connector) => {
    if (connector.id !== "injected" && connector.id !== "walletConnect") return null;
    const name = connector.id === "injected" ? "Browser Wallet" : "Wallet Connect";
    return (
      <Button className="w:48 sm:w-96" variant="outline" key={connector.uid} onClick={() => connect({ connector })}>
        <img src={connector.icon} alt="" />
        {name}
      </Button>
    );
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm_icon">
          <div className="hidden sm:flex text-2xl">connect</div>
          <LogInIcon className="sm:ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full flex flex-col items-center justify-center">
        <DialogHeader>
          <DialogTitle>Select a wallet to connect.</DialogTitle>

          <DialogDescription>{/*  */}</DialogDescription>
        </DialogHeader>

        {connectorList}
      </DialogContent>
    </Dialog>
  );
}

export function DisconnectWalletButton() {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (!isConnected) {
    return null;
  }

  return (
    <Button variant="ghost" size="sm_icon" onClick={(e) => disconnect()}>
      <div className="hidden sm:flex text-base">Cancel</div>
    </Button>
  );
}

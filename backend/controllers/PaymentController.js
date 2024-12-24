var axios = require("axios");
var appointmentModel = require("../models/appointmentModel");
var generateHmacSha256Hash =
  require("./HashingController").generateHmacSha256Hash;
var safeStringify = require("./HashingController").safeStringify;
const esewaConfig = {
  merchantId: "EPAYTEST", // Replace with your eSewa Merchant ID
  successUrl: "http://localhost:5173/success-payment", //Replace with front-end success route page
  failureUrl: "http://localhost:5173/failure-payment", //Replace with front-end failure route page
  esewaPaymentUrl: "https://rc-epay.esewa.com.np/api/epay/main/v2/form",
  secret: "8gBm/:&EnhH.1/q",
};

const initiatePayment = async (req, res) => {
  const { amount, productId, appointmentId } = req.body;

  try {
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    let paymentData = {
      amount,
      failure_url: esewaConfig.failureUrl,
      product_delivery_charge: "0",
      product_service_charge: "0",
      product_code: esewaConfig.merchantId,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      success_url: esewaConfig.successUrl,
      tax_amount: "0",
      total_amount: amount,
      transaction_uuid: productId,
    };

    const data = `total_amount=${paymentData.total_amount},transaction_uuid=${paymentData.transaction_uuid},product_code=${paymentData.product_code}`;
    const signature = generateHmacSha256Hash(data, esewaConfig.secret);
    paymentData = { ...paymentData, signature };

    const payment = await axios.post(esewaConfig.esewaPaymentUrl, null, {
      params: paymentData,
    });

    const reqPayment = JSON.parse(safeStringify(payment));
    if (reqPayment.status === 200) {
      const updatedAppointment = await appointmentModel.findByIdAndUpdate(
        appointmentId,
        { payment: true },
        { new: true }
      );

      if (!updatedAppointment) {
        return res.json({
          success: false,
          message: "Failed to update payment status",
        });
      }

      return res.json({
        url: reqPayment.request.res.responseUrl,
        success: true,
      });
    } else {
      return res.json({ success: false, message: "Payment initiation failed" });
    }
  } catch (error) {
    console.error("Error in initiatePayment:", error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  initiatePayment,
};

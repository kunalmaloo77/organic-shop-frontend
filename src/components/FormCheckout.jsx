import axios from "axios";
import React, { useEffect } from "react";

const FormCheckout = ({ formData, setFormData }) => {
  const { pincode } = formData;
  useEffect(() => {
    const getLocation = async () => {
      try {
        if (pincode.length === 6) {
          const res = await axios.get(
            `https://api.postalpincode.in/pincode/${pincode}`
          );
          const data = res.data[0].PostOffice[0];
          setFormData((prev) => ({
            ...prev,
            city: data.District,
            state: data.State,
          }));
          console.log("response from postal code api ->", res);
        }
      } catch (error) {
        console.log("error fetching postal code->", error);
      }
    };
    getLocation();
  }, [pincode, setFormData]);

  return (
    <>
      <div className="mx-6">
        <form>
          <div className="flex gap-10 my-4  justify-between">
            <div className="w-1/2">
              <div>
                <label htmlFor="fname">First name</label>
              </div>
              <div>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="p-2 mt-2 w-full"
                  required
                />
              </div>
            </div>
            <div className="w-1/2">
              <div>
                <label htmlFor="lname">Last name</label>
              </div>
              <div>
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  value={formData.lastName}
                  required
                  className="p-2 mt-2 w-full"
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="my-4 ">
            <div>
              <label htmlFor="companyName">Company name (optional) </label>
            </div>
            <div>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                className="p-2 mt-2 w-full"
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
              />
            </div>
          </div>
          <div className="my-4 ">
            <div>
              <div>Country/Region </div>
            </div>
            <div>
              <div className="bg-white p-2 mt-2 w-full">
                <p>India</p>
              </div>
            </div>
          </div>
          <div className="my-4 ">
            <div>
              <label htmlFor="address">Street address </label>
            </div>
            <div>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
                placeholder="House number and street name"
                className="p-2 mt-2 w-full"
              />
            </div>
            <div>
              <input
                type="text"
                id="addressOptional"
                name="addressOptional"
                value={formData.addressOptional}
                onChange={(e) =>
                  setFormData({ ...formData, addressOptional: e.target.value })
                }
                placeholder="Appartment, suite, unit etc. (optional)"
                className="p-2 mt-2 w-full"
              />
            </div>
          </div>
          <div className="my-4 ">
            <div>
              <div>Town/City</div>
            </div>
            <div className="p-2 mt-2 w-full bg-white min-h-10">
              {formData.city}
            </div>
          </div>
          <div className="my-4 ">
            <div>
              <div>State</div>
            </div>
            <div className="p-2 mt-2 w-full bg-white min-h-10">
              {formData.state}
            </div>
          </div>
          <div className="my-4 ">
            <div>
              <label htmlFor="pincode">PIN Code</label>
            </div>
            <div>
              <input
                type="text"
                id="pincode"
                name="pincode"
                className="p-2 mt-2 w-full"
                value={formData.pincode}
                onChange={(e) =>
                  setFormData({ ...formData, pincode: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="my-4 ">
            <div>
              <label htmlFor="phone">Phone</label>
            </div>
            <div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="p-2 mt-2 w-full"
                required
              />
            </div>
          </div>
          <div className="my-4 ">
            <div>
              <label htmlFor="phone">Email</label>
            </div>
            <div>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                name="email"
                className="p-2 mt-2 w-full"
                required
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormCheckout;

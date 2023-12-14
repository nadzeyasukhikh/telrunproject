import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const sendOrder = createAsyncThunk(
    "order/sendData",
    async (formData, {rejectWithValue}) => {
        try{
            const response = await fetch("http://localhost:3333/order/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error("Server responded with an error!");
            }
            return await response.json()
        }catch (error){
            return rejectWithValue(error.message)
        }
    }
);

const saleOrder = createSlice({
    name: "order",
    initialState: {
        showModal: false,
        status: "idle",
        error: null
    },
    reducers: {
        setShowModal: (state, action) => {
            state.showModal = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(sendOrder.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(sendOrder.fulfilled, (state) => {
            state.status = "succeeded";
            state.showModal = true;
        })
        .addCase(sendOrder.rejected, (state, action) => {
            state.action = "failed";
            state.error = action.error.message;
        })
    }
})

export const {setShowModal} = saleOrder.actions;
export default saleOrder.reducer;
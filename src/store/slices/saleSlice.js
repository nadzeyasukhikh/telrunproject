import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const sendSaleData = createAsyncThunk(
    "sale/sendData",
    async (formData, {rejectWithValue}) => {
        try{
            const response = await fetch("http://localhost:3333/sale/send", {
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
        return rejectWithValue(error.message);
        }
        
    }
);

const saleSlice = createSlice({
    name: "sale",
    initialState: {
        showModal: false,
        status: "idle",
        error: null
    },
    reducers: {
      setShowModal: (state, action) => {
            state.showModal = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(sendSaleData.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(sendSaleData.fulfilled, (state) => {
            state.status = 'succeeded';
            state.showModal = true;
            
        })
        .addCase(sendSaleData.rejected, (state,action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        }
    }


)

export const { setShowModal } = saleSlice.actions;
export default saleSlice.reducer;
import ProductForm from "../features/admin/components/ProductForm.jsx";
import NavBar from "../features/navbar/Navbar";
function AdminProductFormPage() {
    return ( 
        <div>
            <NavBar>
                <ProductForm></ProductForm>
            </NavBar>
        </div>
     );
}

export default AdminProductFormPage;
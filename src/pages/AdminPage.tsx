import { useState } from "react";
import { ArrowLeft, Plus, Edit, Trash2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Toy, toyCategories, ToyApiService } from "@/services/toyApi";

interface AdminPageProps {
  toys: Toy[];
  onUpdateToys: (toys: Toy[]) => void;
  onBackClick: () => void;
}

/**
 * AdminPage Component - Product management interface
 * Features: CRUD operations for toys, admin-only access
 */
const AdminPage = ({ toys, onUpdateToys, onBackClick }: AdminPageProps) => {
  const [editingToy, setEditingToy] = useState<Toy | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState<Partial<Toy>>({});
  const { toast } = useToast();

  const handleSave = async () => {
    if (!formData.name || !formData.price || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const toyData = {
      ...formData,
      image: formData.image || "https://images.unsplash.com/photo-1558877171-d2e1005c4d6a?w=400&h=400&fit=crop",
      description: formData.description || "Amazing toy for kids!",
      inStock: formData.inStock ?? true,
      rating: formData.rating || 4.5,
      discount: formData.discount || 0
    };

    try {
      if (editingToy) {
        // Update existing toy using API
        const updatedToy = await ToyApiService.updateToy(editingToy.id, toyData);
        if (updatedToy) {
          const updatedToys = toys.map(toy => 
            toy.id === editingToy.id ? updatedToy : toy
          );
          onUpdateToys(updatedToys);
          toast({
            title: "Product Updated! ✅",
            description: `${updatedToy.name} has been updated via API.`
          });
        }
      } else {
        // Add new toy using API
        const newToy = await ToyApiService.createToy(toyData as Omit<Toy, 'id'>);
        onUpdateToys([...toys, newToy]);
        toast({
          title: "Product Added! 🎉",
          description: `${newToy.name} has been added via API.`
        });
      }

      setEditingToy(null);
      setIsAddingNew(false);
      setFormData({});
    } catch (error) {
      toast({
        title: "API Error ❌",
        description: "Failed to save product via API",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (toy: Toy) => {
    const confirmed = confirm(`Are you sure you want to delete "${toy.name}"?`);
    if (confirmed) {
      try {
        const success = await ToyApiService.deleteToy(toy.id);
        if (success) {
          const updatedToys = toys.filter(t => t.id !== toy.id);
          onUpdateToys(updatedToys);
          toast({
            title: "Product Deleted! 🗑️",
            description: `${toy.name} has been removed via API.`
          });
        }
      } catch (error) {
        toast({
          title: "API Error ❌",
          description: "Failed to delete product via API",
          variant: "destructive"
        });
      }
    }
  };

  const handleEdit = (toy: Toy) => {
    setEditingToy(toy);
    setFormData(toy);
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingToy(null);
    setFormData({
      name: "",
      price: 0,
      category: toyCategories[1], // Skip "All"
      description: "",
      image: "",
      inStock: true,
      discount: 0
    });
  };

  const handleCancel = () => {
    setEditingToy(null);
    setIsAddingNew(false);
    setFormData({});
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={onBackClick}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Store
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Admin Panel 👑</h1>
                <p className="text-muted-foreground">Manage your toy inventory</p>
              </div>
            </div>
            
            <Button onClick={handleAddNew} disabled={isAddingNew || editingToy !== null}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Toy
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Form */}
          <div className="lg:col-span-1">
            {(isAddingNew || editingToy) && (
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>
                    {editingToy ? "Edit Product" : "Add New Product"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={formData.name || ""}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter toy name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price || ""}
                      onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category || ""}
                      onValueChange={(value) => setFormData({...formData, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {toyCategories.slice(1).map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description || ""}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Product description"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={formData.image || ""}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="discount">Discount (%)</Label>
                    <Input
                      id="discount"
                      type="number"
                      value={formData.discount || ""}
                      onChange={(e) => setFormData({...formData, discount: Number(e.target.value)})}
                      placeholder="0"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleSave} className="flex-1">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Product List */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Product Inventory ({toys.length} items)
                </h2>
              </div>

              <div className="grid gap-4">
                {toys.map((toy) => (
                  <Card key={toy.id} className={editingToy?.id === toy.id ? "ring-2 ring-primary" : ""}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={toy.image}
                          alt={toy.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">{toy.name}</h3>
                              <p className="text-sm text-muted-foreground">{toy.description}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(toy)}
                                disabled={isAddingNew || (editingToy !== null && editingToy.id !== toy.id)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(toy)}
                                disabled={isAddingNew || editingToy !== null}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <span className="font-bold text-primary">${toy.price}</span>
                            <Badge variant="secondary">{toy.category}</Badge>
                            {toy.discount > 0 && (
                              <Badge variant="destructive">{toy.discount}% OFF</Badge>
                            )}
                            <Badge variant={toy.inStock ? "default" : "outline"}>
                              {toy.inStock ? "In Stock" : "Out of Stock"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
"""added constraint to categories name column

Revision ID: 950f4fea7a5c
Revises: 9c5ca8341f6c
Create Date: 2024-04-21 11:52:22.023873

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '950f4fea7a5c'
down_revision = '9c5ca8341f6c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('categories', schema=None) as batch_op:
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.create_unique_constraint(batch_op.f('uq_categories_name'), ['name'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('categories', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('uq_categories_name'), type_='unique')
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(),
               nullable=True)

    # ### end Alembic commands ###
